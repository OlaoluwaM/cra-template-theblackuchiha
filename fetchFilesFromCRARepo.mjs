import fs from 'fs';
import https from 'https';

function fetchFiles(fileName) {
  console.log('Grabbing files from Github');

  https.get(
    `https://raw.githubusercontent.com/facebook/create-react-app/master/packages/cra-template-typescript/template/src/${fileName}.ts`,
    res => {
      const chunks = [];

      console.log('Reading from response stream');
      res.on('data', chunk => chunks.push(chunk));

      res.on('end', () => {
        const dataFromRequest = chunks.join();

        fs.writeFile(
          `./template/src/${fileName}.ts`,
          dataFromRequest,
          err => err && console.error(err)
        );

        console.log(`Done fetching ${fileName}.ts from Github`);
      });
    }
  );
}

['setupTests', 'reportWebVitals'].map(fetchFiles);
