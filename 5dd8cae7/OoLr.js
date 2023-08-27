const getData = async() => {
    const response = await fetch("https://www.youtube.com/youtubei/v1/get_transcript?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "X-Goog-Visitor-Id": "CgtkRF9KNFJvVlhBWSjR6rSkBg%3D%3D",
        "X-Youtube-Bootstrap-Logged-In": "true",
        "X-Youtube-Client-Name": "1",
        "X-Youtube-Client-Version": "2.20230615.02.01",
        "X-Goog-AuthUser": "0",
        "X-Origin": "https://www.youtube.com",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "same-origin",
        "Sec-Fetch-Site": "same-origin",
        "Authorization": "SAPISIDHASH 1686975846_cefc7f096d425eb8ed1e9feca1c71759021e7bb7",
        "Alt-Used": "www.youtube.com"
    },
    "referrer": "https://www.youtube.com/watch?v=Iwj2pFNXW1g&ab_channel=GadgetInsiderBangla",
    "body": "{\"context\":{\"client\":{\"hl\":\"en\",\"gl\":\"BD\",\"remoteHost\":\"160.238.0.171\",\"deviceMake\":\"\",\"deviceModel\":\"\",\"visitorData\":\"CgtkRF9KNFJvVlhBWSjR6rSkBg%3D%3D\",\"userAgent\":\"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0,gzip(gfe)\",\"clientName\":\"WEB\",\"clientVersion\":\"2.20230615.02.01\",\"osName\":\"X11\",\"osVersion\":\"\",\"originalUrl\":\"https://www.youtube.com/watch?v=Iwj2pFNXW1g&ab_channel=GadgetInsiderBangla\",\"platform\":\"DESKTOP\",\"clientFormFactor\":\"UNKNOWN_FORM_FACTOR\",\"configInfo\":{\"appInstallData\":\"CNHqtKQGEPq-rwUQzLf-EhD-ta8FEOe6rwUQouyuBRCitK8FEInorgUQ-LWvBRDUoa8FEKWZrwUQ6cOvBRC4i64FEJCjrwUQ5LP-EhC9tq4FEMyu_hIQ7qKvBRDrk64FENuvrwUQ3ravBRDyqK8FEMzfrgUQurSvBRDgtq8FEKy3rwUQgp2vBRCMt68FEOf3rgUQw7f-EhDi1K4FEI_DrwUQqrL-EhClwv4SEN3GrwUQ1bavBRDru68FEPjErwUQi9X-Eg%3D%3D\"},\"userInterfaceTheme\":\"USER_INTERFACE_THEME_DARK\",\"timeZone\":\"Asia/Dhaka\",\"browserName\":\"Firefox\",\"browserVersion\":\"114.0\",\"acceptHeader\":\"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8\",\"deviceExperimentId\":\"ChxOekkwTlRVd05UazVPRFUyTnpZM09USTFNUT09ENHqtKQGGNHqtKQG\",\"screenWidthPoints\":881,\"screenHeightPoints\":543,\"screenPixelDensity\":1,\"screenDensityFloat\":1,\"utcOffsetMinutes\":360,\"mainAppWebInfo\":{\"graftUrl\":\"https://www.youtube.com/watch?v=Iwj2pFNXW1g&ab_channel=GadgetInsiderBangla\",\"pwaInstallabilityStatus\":\"PWA_INSTALLABILITY_STATUS_UNKNOWN\",\"webDisplayMode\":\"WEB_DISPLAY_MODE_BROWSER\",\"isWebNativeShareAvailable\":false}},\"user\":{\"lockedSafetyMode\":false},\"request\":{\"useSsl\":true,\"internalExperimentFlags\":[],\"consistencyTokenJars\":[]},\"clickTracking\":{\"clickTrackingParams\":\"CBkQ040EGAciEwiWnN3Wusn_AhWhKLcAHZ9EBcQ=\"},\"adSignalsInfo\":{\"params\":[{\"key\":\"dt\",\"value\":\"1686975827126\"},{\"key\":\"flash\",\"value\":\"0\"},{\"key\":\"frm\",\"value\":\"0\"},{\"key\":\"u_tz\",\"value\":\"360\"},{\"key\":\"u_his\",\"value\":\"3\"},{\"key\":\"u_h\",\"value\":\"768\"},{\"key\":\"u_w\",\"value\":\"1366\"},{\"key\":\"u_ah\",\"value\":\"660\"},{\"key\":\"u_aw\",\"value\":\"1366\"},{\"key\":\"u_cd\",\"value\":\"24\"},{\"key\":\"bc\",\"value\":\"31\"},{\"key\":\"bih\",\"value\":\"543\"},{\"key\":\"biw\",\"value\":\"881\"},{\"key\":\"brdim\",\"value\":\"0,27,0,27,1366,27,1366,660,881,543\"},{\"key\":\"vis\",\"value\":\"1\"},{\"key\":\"wgl\",\"value\":\"true\"},{\"key\":\"ca_type\",\"value\":\"image\"}]}},\"params\":\"CgtJd2oycEZOWFcxZxISQ2dOaGMzSVNBbVZ1R2dBJTNEGAEqM2VuZ2FnZW1lbnQtcGFuZWwtc2VhcmNoYWJsZS10cmFuc2NyaXB0LXNlYXJjaC1wYW5lbDABOAFAAQ%3D%3D\"}",
    "method": "POST",
    "mode": "cors"
});

   const data = await response.json()
   console.log(data)
}

getData()