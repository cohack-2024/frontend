import axios from "axios";

const stablediffusionApi = axios.create({
  baseURL: "https://cb5e2743f03f8d4415.gradio.live/sdapi/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

const LABELS_TO_CHECKPOINT_MAP: { [key: string]: string } = {
  Graphic_Novel: "arthemyComicsXL_v10",
  Manga: "AnythingXL_xl",
  Semi_Realistic: "dreamshaperXL_sfwV2TurboDPMSDE",
  Realistic: "juggernautXL_juggXIByRundiffusion",
};

interface StableDiffusionResponseObject {
  images: string[];
  parameters: Parameters;
}

interface Parameters {
  prompt: string;
  negative_prompt: string;
  styles: null;
  seed: number;
  subseed: number;
  subseed_strength: number;
  seed_resize_from_h: number;
  seed_resize_from_w: number;
  sampler_name: null;
  scheduler: null;
  batch_size: number;
  n_iter: number;
  steps: number;
  cfg_scale: number;
  width: number;
  height: number;
  restore_faces: null;
  tiling: null;
  do_not_save_samples: boolean;
  do_not_save_grid: boolean;
  eta: null;
  denoising_strength: null;
  s_min_uncond: null;
  s_churn: null;
  s_tmax: null;
  s_tmin: null;
  s_noise: null;
  override_settings: Overridesettings;
}

interface Overridesettings {
  sd_model_checkpoint: string;
}

export interface Actor {
  name: string;
  image: string;
  triggerwords: string;
}

const ACTOR_TO_PROMPT_MAP: { [key: string]: string } = {
  "Baylan Skoll": "BAYLAN SKOLL <lora:Baylan_Skoll:.8>",
};

export const fetchStableDiffusionTxt2img = (
  prompt: string,
  checkpoint_label: string,
  large: boolean,
  cast: Actor[],
  negative_prompt?: string
) => {
  const width = large ? 1024 : 512;
  const height = large ? 1024 : 512;
  const sd_model_checkpoint = LABELS_TO_CHECKPOINT_MAP[checkpoint_label];
  const sampler_index = "DPM++ 2M";
  const steps = 20;


  //Add lora
  let loraString = ""; // Initialize an empty string

  cast.forEach((actor) => {
    loraString += ` ${actor.triggerwords}`

    // if (ACTOR_TO_PROMPT_MAP[actor.name]) {
    //   loraString += ", "+ACTOR_TO_PROMPT_MAP[actor.name]; // Append matched prompt and add space
    // }
  });
  prompt = prompt + loraString
  
  //Hack for the graphic novel model. Looks alot better
  if (checkpoint_label==="Graphic Novel") {
    prompt = "graphic novel flat colors style, cropped detail, fine intricate lineart, hatched shadows, " + prompt
  }

  console.log(prompt)
  const payload = {
    prompt,
    negative_prompt: "nudity, gore, nsfw",
    width,
    height,
    steps,
    sampler_index,
    override_settings: {
      sd_model_checkpoint,
    },
  };

  return stablediffusionApi.post<StableDiffusionResponseObject>(
    "/txt2img",
    payload
  );
};

//fire, earthquake, palace, man walking towards camera
