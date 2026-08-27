import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://zqfmjvqfikqbsfyuwovm.supabase.co",
  "sb_publishable_VlkAXGyZsciYB1IHrrvnSQ_1GqU2hKP"
);

export default async function handler(req, res) {
  const { id } = req.query;

  const { data, error } = await supabase
    .from('links')
    .select('image_url, destination_url')
    .eq('id', id)
    .single();

  if (error || !data) {
    return res.status(404).send('<h2>❌ Link not found or expired</h2>');
  }

  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f5f5f5; cursor: pointer; }
        img { max-width: 90vw; max-height: 80vh; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.2); }
        .hint { position: fixed; bottom: 30px; color: #888; font-family: sans-serif; }
      </style>
    </head>
    <body onclick="window.location.href='${data.destination_url}'">
      <img src="${data.image_url}" alt="Click to visit">
      <div class="hint">👆 Click the image to proceed</div>
    </body>
    </html>
  `);
}
