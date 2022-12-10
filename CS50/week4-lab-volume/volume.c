// Modifies the volume of an audio file

#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

// Number of bytes in .wav header
const int HEADER_SIZE = 44;

int main(int argc, char *argv[])
{
    printf("main\n");
    // Check command-line arguments
    if (argc != 4)
    {
        printf("Usage: ./volume input.wav output.wav factor\n");
        return 1;
    }

    // Open files and determine scaling factor
    FILE *input = fopen(argv[1], "r");
    if (input == NULL)
    {
        printf("Could not open file.\n");
        return 1;
    }

    FILE *output = fopen(argv[2], "w");
    if (output == NULL)
    {
        printf("Could not open file.\n");
        return 1;
    }

    float factor = atof(argv[3]);

    // TODO: Copy header from input file to output file
    uint8_t header[HEADER_SIZE];                      // 創建一個 44 bytes 的陣列以儲存 header
    fread(&header, sizeof(uint8_t), HEADER_SIZE, input);   // fread(buffer, size/element, element count, file)
    fwrite(&header, sizeof(uint8_t), HEADER_SIZE, output); // fwrite(data, size/element, element count, file)
    // or 
    // fread(&header, sizeof(header), 1, input);   // fread(buffer, size/element, element count, file)
    // fwrite(&header, sizeof(header), 1, output); // fwrite(data, size/element, element count, file)

    // TODO: Read samples from input file and write updated data to output file
    int16_t buffer;
    int readCount = 1;
    while (readCount == 1)
    {
        readCount = fread(&buffer, sizeof(int16_t), 1, input);
        if (readCount == 0)
        {
            printf("stop reading\n");
            break;
        }
        buffer = buffer * factor;
        fwrite(&buffer, sizeof(int16_t), 1, output);
    }
    printf("prepare closing fclose\n");
    // 關閉輸入和輸出檔案
    fclose(input);
    printf("fclose input finish\n");
    fclose(output);
    printf("fclose output finish\n");
    return 0;
}
