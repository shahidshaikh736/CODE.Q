const { spawn } = require('child_process');

console.log('🤖 Starting Python AI Service...');
const python = spawn('python', ['ai-service/main.py'], { stdio: 'inherit' });

python.on('error', (err) => {
  if (err.code === 'ENOENT') {
    console.warn('\n⚠️ [AI Service Info]: Python is not installed or not in PATH.');
    console.warn('💡 CODE.Q is running! Fastify backend will automatically use local JS AI heuristics.');
  } else {
    console.error('\n⚠️ [AI Service Info]: Failed to start Python service:', err.message);
  }
  process.exit(0); // Exit cleanly so concurrently doesn't report exit error
});

python.on('exit', (code) => {
  if (code !== 0) {
    console.warn(`\n⚠️ [AI Service Info]: Python service exited with code ${code} (possibly missing fastapi/uvicorn modules).`);
    console.warn('💡 CODE.Q is running! Fastify backend will automatically use local JS AI heuristics.');
    console.warn('👉 To enable python AI features, run: pip install -r ai-service/requirements.txt\n');
  }
  process.exit(0); // Exit cleanly
});
