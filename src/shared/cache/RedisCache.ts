import Redis, {Redis as RedisClient} from 'ioredis';
import cacheConfig from '../../config/cache';

export default class RedisCache {

    private client: RedisClient;

    constructor(){

        this.client = new Redis(cacheConfig.config.redis);
    }

    public async save(key:string, value: any): Promise<void>{

        console.log(key,value)
    }

}