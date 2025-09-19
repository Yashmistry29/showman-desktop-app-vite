import React from 'react'
import { sendRequest } from '../utils/Helpers/HelpersMethod';
import JSZip from 'jszip';
import { toast, ToastContainer } from 'react-toastify';
const electron = window.require("electron");

function BackupRestore() {
  const zip = new JSZip();


  const handleBackup = () => {
    sendRequest('/db/backup', 'POST')
      .then(async (result) => {
        const date = new Date();
        const fileName = date.getDate() + '-' + Number(date.getMonth() + 1) + '-' + date.getFullYear() + '.zip';
        zip.file('data.json', JSON.stringify(result.data));
        const content = await zip.generateAsync({ type: 'blob' });
        const url = window.URL.createObjectURL(content);
        console.log(url);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display:none";
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      })
  }

  const handleRestore = async () => {
    const result = await electron.ipcRenderer.invoke('Restore');
    var path = result[0];
    console.log(path);
    const resp = await sendRequest('/db/restore', 'POST', { path: path });
    resp.success ? toast.info(resp.message, {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
    }) : toast.error(resp.message, {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
    });
  }

  return (
    <div className='m-8 space-x-3 flex'>
      <ToastContainer />
      <button
        className='cursor-pointer bg-white border-[3px] shadow-lg shadow-black/45 w-1/2 h-12 rounded-md font-semibold'
        onClick={handleBackup}
      >Backup</button>
      <button
        className='cursor-pointer bg-white border-[3px] shadow-lg shadow-black/45 w-1/2 h-12 rounded-md font-semibold'
        onClick={handleRestore}
      >Restore</button>
    </div>
  )
}

export default BackupRestore