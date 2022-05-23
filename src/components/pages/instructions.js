import React from 'react'
import "./instructions.css"

const Instructions = () => {
  return (
    // <div style={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: '90vh',
    //     color: 'white'
    //     }}
    // >
    <div>
        <h1 className='instructions-title'>Instructions</h1>
        <h1 className='instructions-sub'>Text Feature</h1>
        <p className='instructions-text'>
            1. Copy the text of text that you wish to summarize
        </p>
        <p className='instructions-text'>
            2. Paste the text in the textbox of INFOX
        </p>
        <p className='instructions-text'>
            3. The model will take first 5000 characters if you are signed in, 1000 characters otherwise
        </p>
        <p className='instructions-text'>
            4. You will receive the summary shortly after clicking submit
        </p>
        <h1 className='instructions-sub'>URL Feature</h1>
        <p className='instructions-text'>
            1. Find the article from the list of approved websites
        </p>
        <p className='instructions-text'>
            2. Copy the URL to the article at the top of the page
        </p>
        <p className='instructions-text'>
            3. Paste the url in the textbox of INFOX
        </p>
        <p className='instructions-text'>
            4. The model will take first 5000 characters if you are signed in, 1000 characters otherwise
        </p>
        <p className='instructions-text'>
            5. You will receive the summary shortly after clicking submit
        </p>
        <h1 className='instructions-sub'>Approved Websites</h1>
        <a className='instructions-text' href="https://www.wikinews.org/">Wiki News</a>
        <br></br>
        <a className='instructions-text' href="https://www.nih.gov/">National Institutes of Health</a>
        <br></br>
        <a className='instructions-text' href="https://cdn.animenewsnetwork.com/">Anime News Network</a>
        <br></br>
        <a className='instructions-text' href="https://news.radio-t.com/">News for Radio-T808</a>
        <br></br>
        <p className='instructions-text2'>
            For more, visit: <a className='link' href='https://www.pythonanywhere.com/whitelist/'>https://www.pythonanywhere.com/whitelist/</a>
        </p>
    </div>
  )
}

export default Instructions