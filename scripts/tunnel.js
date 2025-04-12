
import ngrok from 'ngrok';

try {
  const url = await ngrok.connect({
    addr: 8080, // Matches your Vite server port
    authtoken_from_env: true
  });
  console.log('Ngrok tunnel created:', url);
} catch (err) {
  console.error('Error creating tunnel:', err);
}
