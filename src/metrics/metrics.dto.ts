import { IsString, IsNumber } from "class-validator";

export class MetricsDTO{
    
    @IsString()
    campaignName: string;
    
    @IsNumber()
    impressions: number;
    
    @IsNumber()
    clicks: number;
    
    @IsNumber()
    conversions: number;
    
    @IsString()
    spend: string;
}