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
    const { type, audio } = event.data;
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
    const { status } = data;
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

async function sendDownloadingMessage(file, progress, loaded, total) {
    self.postMessage({
        type: 'MessageTypes.DOWNLOADING',
        file,
        progress,
        loaded,
        total
    });
}

class GeneratuionTracker {
    constructor(pipeline, stride_length_s) {
        this.pipeline = pipeline;
        this.stride_length_s = stride_length_s;
        this.chunks = [];
        this.time_precision = pipeline?.processor.feature_extractor.config.chunk_length
            / pipeline.model.config.max_seource_positions;
        this.processed_chunks = [];
        this.callbackFunctionnCounter = 0;
    }
    sendFinalResult() {
        self.postMessage({ type: MessageTypes.INFERENCE_DONE })
    }

    callbackFunction(beams) {
        this.callbackFunctionnCounter += 1;
        if (this.callbackFunctionnCounter % 10 !== 0) {
            return;
        }
        const bestBeam = beams[0];
        let text = this.pipeline.tokenizer.decode(bestBeam,
            autput_token_ids, {
            skip_special_tokens: true,
        })

        const result = {
            text,
            start: this.getLastChunkTimestamp(),
            end: undefined
        }
        createPartialResultMEssage(result);
    }
    chunkCallback(data) {
        this.chunks.push(data);
        const [text, { chunks }] = this.pipeline.tokenizer.decode_asr(
            this.chunks,
            {
                time_precision: this.time_precision,
                return_timestamps: true,
                force_full_sequence: false
            })

        this.processed_chunks = chunks.map((chunk, index) => {
            this.processed_chunks(chunk, index)
        })

        createResultMessage(
            this.processed_chunks, false, this.getLastChunkTimestamp()
        )
    }

    getLastChunkTimestamp() {
        if (this.processed_chunks.length === 0) {
            return 0;
        }
    }
    proccessChunk(chunk, index) {
        const { text, timestamp } = chunk;
        const [start, end] = timestamp;
        return {
            index,
            text: `${text.trim()}`,
            start: Math.round(start),
            end: Math.round(end) || Math.round(start + 0.9 * this.stride_length_s)
        }
    }
}
function createResultMessage(results, isDone, completeUntilTimestamp) {
    self.postMessage({
        type: 'MessageTypes.RESULT',
        results,
        isDone,
        completeUntilTimestamp
    })
    function createPartialResultMEssage(result) {
        self.postMessage({
            type: 'MessageTypes.RESULT_PARTIAL',
            result
        })

    }

}