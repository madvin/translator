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