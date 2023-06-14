import { IsString, IsBoolean } from 'class-validator';
import { Song } from '../entities/song.entity';
import { plainToClass } from 'class-transformer';
export class GameSongDto {
  constructor(song: Song) {
    this.songTitle = song.songTitle;
    this.singer = song.singer;
    this.songLyrics = song.songLyrics;
    this.songFile = song.songFile;
    this.songGender = song.songGender;
    this.songMale = song.songMale;
    this.songMaleUp = song.songMaleUp;
    this.songMaleDown = song.songMaleDown;
    this.songFemale = song.songFemale;
    this.songFemaleUp = song.songFemaleUp;
    this.songFemaleDown = song.songFemaleDown;
    this.vocalMale = song.vocalMale;
    this.vocalMaleUp = song.vocalMaleUp;
    this.vocalMaleDown = song.vocalMaleDown;
    this.vocalFemale = song.vocalFemale;
    this.vocalFemaleUp = song.vocalFemaleUp;
    this.vocalFemaleDown = song.vocalFemaleDown;
  }

  @IsString()
  songTitle: string;

  @IsString()
  singer: string;

  @IsString()
  songLyrics: string;

  @IsString()
  songFile: string;

  @IsBoolean()
  songGender: boolean;

  @IsString()
  songMale: string;

  @IsString()
  songMaleUp: string;

  @IsString()
  songMaleDown: string;

  @IsString()
  songFemale: string;

  @IsString()
  songFemaleUp: string;

  @IsString()
  songFemaleDown: string;

  @IsString()
  vocalMale: string;

  @IsString()
  vocalMaleUp: string;

  @IsString()
  vocalMaleDown: string;

  @IsString()
  vocalFemale: string;

  @IsString()
  vocalFemaleUp: string;

  @IsString()
  vocalFemaleDown: string;

  // toJSON() {
  //   return plainToClass(GameSongDto, this);
  // }
  toJSON() {
    return {
      songTitle: this.songTitle,
      singer: this.singer,
      songLyrics: this.songLyrics,
      songFile: this.songFile,
      songGender: this.songGender,
      songMale: this.songMale,
      songMaleUp: this.songMaleUp,
      songMaleDown: this.songMaleDown,
      songFemale: this.songFemale,
      songFemaleUp: this.songFemaleUp,
      songFemaleDown: this.songFemaleDown,
      vocalMale: this.vocalMale,
      vocalMaleUp: this.vocalMaleUp,
      vocalMaleDown: this.vocalMaleDown,
      vocalFemale: this.vocalFemale,
      vocalFemaleUp: this.vocalFemaleUp,
      vocalFemaleDown: this.vocalFemaleDown,
    };
  }
}