import { HttpStatus, Injectable } from '@nestjs/common';
import { JSONPreset } from 'lowdb/node'
import { IMetricsSchema } from '../utils/typings';
import path from 'path';
import { ApiResponse, IGenericResponse } from '../utils/apiResponse';
import { MetricsDTO } from './metrics.dto';

@Injectable()
export class MetricsService {
    private db;
    
    constructor() {
        
       let defaultData: {metrics: IMetricsSchema[]};
       defaultData.metrics = [] as IMetricsSchema[]
        (async () => {
            this.db = await JSONPreset(path.join(__dirname,"..","..",'db.json'), defaultData)
        })()
       
        this.db.defaults({ metrics: [] }).write();
      }

      async createMetrics(dto: MetricsDTO): Promise<IGenericResponse<IMetricsSchema>>{
        try{
            await this.db.get("metrics").push(dto).write();
            return ApiResponse.success("metrics stored", HttpStatus.OK, dto as any)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
      }


      async getMetrics(query = null): Promise<IGenericResponse<IMetricsSchema[]>>{
        try{
            let metrics = await this.db.get("metrics").value();

            metrics = Object.keys(query).length > 0 ? metrics.filter((m) => m.campaignName === query.campaignName) : metrics;
            return ApiResponse.success("metrics stored", HttpStatus.OK, metrics)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
      }

      

      async getMetric(campaignName: string): Promise<IGenericResponse<IMetricsSchema>>{
        try{
            const metrics = await this.db.get("metrics").value();
            return ApiResponse.success("metrics stored", HttpStatus.OK, metrics)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
      }

      
    }
