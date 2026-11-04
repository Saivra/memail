import sharp from 'sharp';
import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname, resolve} from 'node:path';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const directory=resolve(root,'public/branding/memail');
await mkdir(directory,{recursive:true});
for (const [source,output,width] of [
  ['mark.svg','icon-192.png',192], ['mark.svg','icon-512.png',512],
  ['mark.svg','mark.png',256], ['mark-dark.svg','mark-dark.png',256],
  ['wordmark.svg','wordmark.png',1024], ['wordmark-dark.svg','wordmark-dark.png',1024],
]) await sharp(await readFile(resolve(directory,source))).resize({width}).png().toFile(resolve(directory,output));
await sharp(await readFile(resolve(directory,'mark.svg'))).resize(180,180).png().toFile(resolve(root,'public/apple-touch-icon.png'));
for (const size of [192,512]) {
  await sharp(await readFile(resolve(directory,'mark.svg'))).resize(size,size).png().toFile(resolve(root,`public/icon-${size}x${size}.png`));
  for (const variant of ['light','dark']) {
    const pixels=Math.round(size*0.6);
    const input=await sharp(await readFile(resolve(directory,variant==='dark'?'mark-dark.svg':'mark.svg'))).resize(pixels,pixels).png().toBuffer();
    await sharp({create:{width:size,height:size,channels:4,background:variant==='dark'?'#e5efde':'#1d4534'}}).composite([{input,left:Math.floor((size-pixels)/2),top:Math.floor((size-pixels)/2)}]).png().toFile(resolve(root,`public/icon-maskable-${variant}-${size}x${size}.png`));
  }
}
// Maskable PWA icons need a safe zone; keep the complete mark inside its central 60%.
const safe=await sharp(await readFile(resolve(directory,'mark.svg'))).resize(308,308).png().toBuffer();
await writeFile(resolve(directory,'icon-maskable-512.png'),await sharp({create:{width:512,height:512,channels:4,background:'#1d4534'}}).composite([{input:safe,left:102,top:102}]).png().toBuffer());
await sharp(await readFile(resolve(root,'docs/images/memail-banner.svg'))).png().toFile(resolve(root,'docs/images/memail-social-preview.png'));
