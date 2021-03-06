import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
  newPost='No content';
  enteredContent = '';
  enteredTitle ='';
  isLoading= false;
  private mode = 'create';
  private postId:string;
  public post: Post;

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=> {
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData=> {
          this.isLoading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content} ;
        });
      }
      else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  onAddPost(form: NgForm) {
    if(form.invalid) {
      return;
    }
    if(this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    }
    else {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content);
    }

    form.resetForm();
  }

}
