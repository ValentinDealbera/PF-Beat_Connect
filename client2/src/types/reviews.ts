import { UserClass, BeatsClass } from "@/types";

type ReviewsProps = {
    id: string;
    rating: number;
    title: string;
    comment: string;
    softDelete: boolean;
    dataCreated: Date;
    createdBy: UserClass;
    beat: BeatsClass;
};


export class ReviewsClass {
  id: string;
  rating: number;
  title: string;
  comment: string;
  softDelete: boolean;
  dataCreated: Date;
  createdBy: UserClass;
  beat: BeatsClass;

  constructor({
    id,
    rating,
    title,
    comment,
    softDelete,
    dataCreated,
    createdBy,
    beat,
  }: ReviewsProps) {
    this.id = id;
    this.rating = rating;
    this.title = title;
    this.comment = comment;
    this.softDelete = softDelete;
    this.dataCreated = dataCreated;
    this.createdBy = createdBy;
    this.beat = beat;
  }

  static deserialize(input: any): ReviewsClass {
    return new ReviewsClass({
      id: input.id,
      rating: input.rating,
      title: input.title,
      comment: input.comment,
      softDelete: input.softDelete,
      dataCreated: input.dataCreated,
      createdBy: input.createdBy,
      beat: input.beat,
    });
  }
}
