export interface ILesson {
  id: string;
  title: string;
  availableAt: string;
  lessonType: "live" | "class";
  slug: string;
}
