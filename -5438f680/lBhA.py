import yt_dlp

def get_video_transcript(video_url):
    ydl_opts = {
        'skip_download': True,  # Avoid downloading the video
        'writesubtitles': False,  # Do not write the subtitles to a file
        'subtitleslangs': ['en'],  # Specify the desired language code(s)
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(video_url, download=False)
        video_id = info['id']
        subtitles = ydl.get_subtitles(video_url)

        if 'en' in subtitles:
            transcript = subtitles['en']
            print(transcript)
        else:
            print("No subtitles available for the video.")

# Usage example
video_url = 'https://www.youtube.com/watch?v=G0Cp7DrvNLQ&t=16ss'
get_video_transcript(video_url)
