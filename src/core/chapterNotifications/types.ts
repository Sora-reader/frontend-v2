export type ChapterNotificaiton = {
  id: number,
  chapter_title: string
  manga_thumbnail: string
  date_time: string;
};

export type ChapterNotificationList = Array<ChapterNotificaiton>

export type ChapterNotificationEditIn = string;
export type ChapterNotificationEditOut = {
  count: number;
};
