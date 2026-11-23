import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

const AREAS = ["Bole", "Piassa", "Kazanchis", "Sarbet", "CMC"] as const;
export type Area = (typeof AREAS)[number];

@Injectable()
export class ParseAreaPipe implements PipeTransform<string, Area> {
  transform(value: string, metadata: ArgumentMetadata): Area {
    if (!value) throw new BadRequestException(metadata.data + " is required");
    const normalized = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    if (!AREAS.includes(normalized as Area)) {
      throw new BadRequestException(metadata.data + " must be one of: " + AREAS.join(", "));
    }
    return normalized as Area;
  }
}
