export class Review {
    constructor(
      public name: string,
      public rating: number,
      public major: string,
      public year: number,
      public review: string,
      public upvote: number,
      public downvote: number
    ) {}
  }