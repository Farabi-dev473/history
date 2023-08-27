const youtubedl = require('youtube-dl-exec');

const videoUrl = 'https://www.youtube.com/watch?v=https://www.youtube.com/watch?v=MXJCnccDLA0&list=RDMXJCnccDLA0&start_radio=1&ab_channel=T-Series';

// Use the `youtube-dl-exec` package to download the video information
youtubedl.exec(videoUrl, ['-e', '--get-id', '--get-duration'], {}, (err, output) => {
  if (err) {
    console.error('Error:', err);
    return;
  }

  const [title, videoId, duration] = output.trim().split('\n');

  console.log('Title:', title);
  console.log('Video ID:', videoId);
  console.log('Duration:', duration);

  // Use the `youtube-dl-exec` package to download the transcript
  youtubedl.exec(videoUrl, ['--skip-download', '--write-auto-sub', '--sub-lang', 'en', '--convert-subs', 'srt'], {}, (err, output) => {
    if (err) {
      console.error('Error:', err);
      return;
    }

    console.log('Transcript downloaded successfully:', output);
  });
});
