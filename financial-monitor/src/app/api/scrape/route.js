import { exec } from 'child_process';

export async function POST(req) {
  const { url } = await req.json(); 

  return new Promise((resolve, reject) => {
    exec(`python3 ./src/python-scripts/scrape.py "${url}"`, (error, stdout, stderr) => {
      if (error) {
        console.error("Error executing script:", error);
        reject(new Response('Error running Python script', { status: 500 }));
      } else if (stderr) {
        console.error("Script stderr:", stderr);
        reject(new Response(stderr, { status: 500 }));
      } else {
        try {
          const data = JSON.parse(stdout); 
          resolve(new Response(JSON.stringify(data), { status: 200 }));
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          reject(new Response('Error parsing Python output', { status: 500 }));
        }
      }
    });
  });
}