import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  MaxLength,
  IsUUID,
  IsBoolean,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MaxLength(255, { message: 'El nombre no puede superar los 255 caracteres.' })
  name: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La descripción es obligatoria.' })
  description: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe ser un número con hasta 2 decimales.' },
  )
  @Min(0, { message: 'El precio no puede ser negativo.' })
  price: number;

  @IsUUID('4', { message: 'El subcategoryId debe ser un UUID válido.' })
  subcategoryId: string;

  @IsNumber({}, { message: 'El stock debe ser un número.' })
  @Min(0, { message: 'El stock no puede ser negativo.' })
  stock: number;

  @IsString({ message: 'La imagen debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La imagen es obligatoria.' })
  image: string;

  @IsOptional()
  @IsString({ message: 'La marca debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'La marca no puede superar los 100 caracteres.' })
  brand?: string;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El peso debe ser un número con hasta 2 decimales.' },
  )
  @Min(0, { message: 'El peso no puede ser negativo.' })
  weight?: number;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'La longitud debe ser un número con hasta 2 decimales.' },
  )
  @Min(0, { message: 'La longitud no puede ser negativa.' })
  length?: number;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El ancho debe ser un número con hasta 2 decimales.' },
  )
  @Min(0, { message: 'El ancho no puede ser negativo.' })
  width?: number;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'La altura debe ser un número con hasta 2 decimales.' },
  )
  @Min(0, { message: 'La altura no puede ser negativa.' })
  height?: number;

  @IsOptional()
  @IsBoolean({ message: 'El estado debe ser booleano.' })
  isActive?: boolean;
}
