import React, { useState } from 'react'

export default function Deploy() {
  const [status, setStatus] = useState(false);
  const [repoURL, setRepoURL] = useState('');
  const [deployURL, setDeployURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function isValidRepoURL(url: string) : boolean {
    const repoRegex = /^(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9-]+)\/([a-zA-Z0-9-]+)(?:\/)?$/;

    return repoRegex.test(url);
  }

  async function postDeployment() {
    if (isValidRepoURL(repoURL)) {
      const response = await fetch('http://localhost:5171/deploy', { 
        method: 'post', 
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({ "repoURL": repoURL })
      });

      const data = await response.json();
      
      if (data.error) {
        setErrorMessage(data.error);
      } else {
        setDeployURL(data.deployID);
        setStatus(true);
      };
    }
  }

  const liveURL = deployURL + '.http://localhost:5173';
  const isLiveMessage = repoURL.split('/')[4] + ' is live at ';

  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen bg-gray-100'>
      <div className='flex flex-col justify-center w-[450px] p-6 rounded-2xl bg-white mb-[4rem] shadow-md'>
        <h1 className='text-xl font-bold mb-3'>Deploy your Web Application</h1>
        <span className='text-sm text-gray-400 font-medium mb-6'>Enter the URL of your GitHub repository to deploy to Atmos!</span>
        <label className='text-base font-semibold mb-[10px]'>GitHub Repository URL</label>
        <input onChange={(e) => setRepoURL(e.target.value)} type='text' className='w-full py-2 px-3 border border-gray-200 rounded-lg mb-6' />
        <button onClick={postDeployment} className='w-full text-base text-white font-medium px-0 py-[10px] bg-gray-500 hover:bg-gray-600 rounded-lg'>Deploy Repo</button>
      </div>
      <div className='flex flex-col justify-evenly w-[450px] px-6 py-4 bg-white rounded-2xl shadow-md'>
        <h1 className='text-lg font-semibold'>Status: <span className={!status ? 'text-red-500' : 'text-green-500'}>{!status ? 'Not Deployed' : 'Deployed!'}</span></h1>
        <div>
          {status && deployURL != '' ?
            <>
              <span>{isLiveMessage}</span>
              <a href={liveURL} >{liveURL}</a>
            </>
          :
            <span>{errorMessage}</span>
          }
        </div>
      </div>
    </div>
  )
}