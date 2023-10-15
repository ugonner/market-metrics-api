import { HttpStatus, Injectable } from '@nestjs/common';
import { IMetricsSchema } from '../utils/typings';
import * as path from 'path';
import { ApiResponse, IGenericResponse } from '../utils/apiResponse';
import { MetricsDTO } from './metrics.dto';
import * as fs from 'fs';

@Injectable()
export class MetricsService {
    private db;
    private dbFile = path.join(__dirname,"..","..","db",'db.json');

    constructor() {}

      async createMetrics(dto: MetricsDTO): Promise<IGenericResponse<MetricsDTO>>{
        try{

            const dbDataString = await fs.readFileSync(this.dbFile, "utf-8")
            if(!dbDataString){
                await fs.writeFileSync(this.dbFile, JSON.stringify(([dto])))
                return ApiResponse.success("data stored", HttpStatus.CREATED, dto)
            }

            const dbData = JSON.parse(dbDataString);
            if(dbData.find((d) => d.campaignName === dto.campaignName)){
                return ApiResponse.fail("Campaign already exists", HttpStatus.BAD_REQUEST)
            }
            dbData.push(dto);
            await fs.writeFileSync(this.dbFile, JSON.stringify(dbData));
            return ApiResponse.success("metrics stored", HttpStatus.OK, dto as any)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
      }


      async getMetrics(query = null): Promise<IGenericResponse<MetricsDTO[]>>{
        try{
            const dbDataString = await fs.readFileSync(this.dbFile, "utf-8")
            if(!dbDataString){
                return ApiResponse.fail("no data found", HttpStatus.NOT_FOUND)
            }

            let metrics = JSON.parse(dbDataString);
            
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
