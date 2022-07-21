import fs from 'fs';
import * as xml2json from 'xml2json';
import extract from 'extract-zip';
import http from 'http';
import path from 'path'

(async () => {
   //download file
   await new Promise(resolve => {
      http.get('http://www.cbr.ru/vfs/mcirabis/BIKNew/20220721ED01OSBR.zip', (res) => {
         // chunk received from the server
         res.on('data', (chunk) => {
            fs.appendFileSync('./xml.zip', chunk);
         });

         // last chunk received, we are done
         res.on('end', () => {
            resolve();
         });
      })
   })

   // extract zip file
   await extract(path.resolve('./xml.zip'), { dir: path.resolve('./') })

   //read and parse
   const xml = fs.readFileSync('./20220721_ED807_full.xml', 'utf8');
   const json = xml2json.toJson(xml);

   console.log(JSON.parse(json))
   return json;
})()
