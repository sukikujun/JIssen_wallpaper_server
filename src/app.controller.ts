import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';
import _ from 'lodash';
import { Response } from 'express';
import { readFile, readdir } from 'fs/promises';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello(@Res() res: Response) {
    const files = await readdir(resolve(__dirname, '..', 'wallpaper'))
    // return 'http://localhost:3000/wallpaper/' + files[_.random(files.length - 1)]

    const file = await readFile(resolve(__dirname, '../wallpaper', files[_.random(files.length - 1)]))

    return new Promise((resolve) => {
      setTimeout(() => {
        // res.set('Content-type', 'image/jpeg')
        res.type('image/jpeg')
        return res.send(file)
      }, 2000);
    })

  }
}
