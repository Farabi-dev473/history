import yt_dlp

# YouTube video URL
video_url = "https://www.youtube.com/watch?v=MXJCnccDLA0&list=RDMXJCnccDLA0&start_radio=1&ab_channel=T-Series"

# Options for yt-dlp
options = {
    'writesubtitles': True,
    'subtitleslangs': ['en'],  # Specify the language code(s) you want to retrieve
    'skip_download': True,     # Skip downloading the video
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'wav',
        'preferredquality': '192',
    }],
}

# Create a yt-dlp instance
ydl = yt_dlp.YoutubeDL(options)

# Extract video info
video_info = ydl.extract_info(video_url, download=False)

# Get the transcripts
transcripts = video_info.get('subtitles')

# Print the transcripts
for transcript in transcripts:
    print(transcript['ext'], transcript['url'])
