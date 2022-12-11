#include <stdio.h>
#include "helpers.h"

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            RGBTRIPLE pixel = image[i][j];
            int avg = (int)((pixel.rgbtBlue + pixel.rgbtGreen + pixel.rgbtRed) / 3.0 + 0.5);
            image[i][j].rgbtBlue = avg;
            image[i][j].rgbtGreen = avg;
            image[i][j].rgbtRed = avg;
        }
    }
    return;
}

/**
 * @brief
 * 根據原三原色的初始值，算出需要的結果。大於 255 則只回傳 255 。
 * @param adjustRed - 要調整多少紅色。
 * @param adjustGreen - 要調整多少綠色。
 * @param adjustBlue - 要調整多少藍色。
 * @param pixel - RGBTRIPLE 的物件。
 * @return int
 */
int calulate(float adjustRed, float adjustGreen, float adjustBlue, RGBTRIPLE pixel)
{
    int result = (adjustRed * pixel.rgbtRed + adjustGreen * pixel.rgbtGreen + adjustBlue * pixel.rgbtBlue) + 0.5; // + 0.5 for rounding the digit
    return result > 255 ? 255 : result;
}

// Convert image to sepia
void sepia(int height, int width, RGBTRIPLE image[height][width])
{

    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            RGBTRIPLE pixel = image[i][j];
            image[i][j].rgbtBlue = calulate(0.272, 0.534, 0.131, pixel);
            image[i][j].rgbtGreen = calulate(0.349, 0.686, 0.168, pixel);
            image[i][j].rgbtRed = calulate(0.393, 0.769, 0.189, pixel);
        }
    }
    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < (int)(width / 2); j++)
        {
            RGBTRIPLE tempPixel = image[i][j];
            image[i][j] = image[i][width - j - 1];
            image[i][width - j - 1] = tempPixel;
        }
    }
    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    return;
}
