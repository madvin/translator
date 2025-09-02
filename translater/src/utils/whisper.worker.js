import { pipeline } from '@xenova/transformers';

class MyTracriptionPipeline {
    static task = 'automatic-speech-recognition';
    static model = 'openai/whisper-small';
    static instance = null;
    
    static async getInstance() {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, this.model);
        }
        return this.instance;
    }
}

self.addEventListener('message', async (event) => {
    const {type, audio } = event.data;
    if (type === 'MessageTypes.INFERENCE_REQUEST') {
        await transcribe(audio)
    } 
})
async function transcribe(audio) {
    sendLoadingMessage('loading');

    let pipeline;
    try {
        pipeline = await MyTracriptionPipeline.getInstance();
    } catch (error) {
        sendErrorMessage('Failed to load model: ' + error.message);
        console.log('Failed to load model: ', error);
        
        return;
    }
    sendLoadingMessage('succsess');

    const stride_length_s = 5;

    const generationTracker = new GeneratuionTracker(pipeline, stride_length_s);

    await pipeline(audio, {
        top_k: 0,
        do_sample: false,
        chunk_length_s: 30,
        stride_length_s,
        return_timestamps: true,
        callback_function: generationTracker.callbackFunction.bind(generationTracker),
        chunk_callback: generationTracker.chunkCallback.bind(generationTracker),
    })
    generationTracker.sendFinalResult();
}

async function load_model_callback(data) {
    const {status} = data;
    if (status === 'progress') {
        sendLoadingMessage(file, progress, loaded, total);
    }  
}

function sendLoadingMessage(status) {
    self.postMessage({
        type: 'MessageTypes.LOADING',
        status
    });
}