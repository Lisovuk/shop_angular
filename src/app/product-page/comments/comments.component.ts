import { Component, Input } from '@angular/core';
import { ProductsService } from './../../products.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  user: string = '';
  comment: string = '';
  @Input() productId: number | undefined;
  @Input() comments: any[] = [];

  constructor(private productService: ProductsService) { }

  addComment() {
    if (this.user && this.comment && this.productId) {
      this.productService.addComment(this.user, this.comment, this.productId)
        .subscribe(
          response => {
            this.comments = response.comments;
            this.user = '';
            this.comment = '';
          },
          error => {
            console.log(error);
          }
        );
    }
  }

  processComment(comment: string): string {
    const replacedWords = ['кокос', 'банан', 'плохой'];
    const replacementChar = '*';

    // Замена символов '@' на '*'
    const replacedSymbols = comment.replace(/@/g, replacementChar);

    // Замена слов
    const replacedComment = replacedSymbols.split(' ').map(word => {
      const lowerCaseWord = word.toLowerCase();
      if (replacedWords.includes(lowerCaseWord)) {
        return replacementChar.repeat(word.length);
      }
      return word;
    }).join(' ');

    return replacedComment;
  }
}
