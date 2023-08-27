import yt_dlp

def get_video_transcript(video_url):
    ydl_opts = {
        'skip_download': True,  # Avoid downloading the video
        'writesubtitles': True,  # Write the subtitles to a file
        'subtitleslangs': ['en'],  # Specify the desired language code(s)
        'subtitlesformat': 'srt',  # Choose the subtitle format
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(video_url, download=False)
        video_id = info['id']
        ydl.download(['https://www.youtube.com/watch?v=' + video_id])

        # Get the transcript text
        subtitle_file = f"{video_id}.en.srt"
        with open(subtitle_file, 'r') as file:
            transcript = file.read()

        print(transcript)

        # Optionally, delete the subtitle file
        # os.remove(subtitle_file)

# Usage example
video_url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
get_video_transcript(video_url)
