import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../../services/Threads.service';
import { SessionService } from '../../services/Session.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import "rxjs/add/operator/mergeMap";

@Component({
  selector: 'app-single-thread',
  templateUrl: './single-thread.component.html',
  styleUrls: ['./single-thread.component.css']
})
export class SingleThreadComponent implements OnInit {
  thread:object;
  error: string;
  contentReply: string;
  threadId: string;
  show:boolean = false;

  constructor(private ThreadsService: ThreadsService, private route:ActivatedRoute, private Session: SessionService) {
    route.params
      .mergeMap( t => ThreadsService.getSingleThread(t.id) )
      .subscribe( thread => {
        console.log(thread);
        this.threadId = thread._id;
        this.thread = thread;
      });
  }

  ngOnInit() {
  }

  replyForm() {
    this.show = !this.show;
  }
  addReply() {
    this.ThreadsService.addReply(this.threadId, this.contentReply).subscribe( thread => this.thread = thread);
    this.contentReply = "";
  }


}
