import axios from 'axios'

const stablediffusionApi = axios.create({
  baseURL: 'https://a72468c0730e3ee1c0.gradio.live/sdapi/v1/txt2img'
});


export const txt2img = (checpoint:string, prompt: string, negprompt:string) => {
  


}
