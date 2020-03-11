import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit, AfterViewInit {

  quoteObj;

  quotes = [
    {quote: `We don't just build websites, we build websites that SELLS`, author: `Christopher Dayagdag`},
    {quote: `Getting a quality website is not an expenses but rather an investment`, author: `Christopher Dayagdag`},
    {quote: `If You Think Math is Hard Try Web Design 😂`, author: `Pixxelznet`},
    {quote: `Design is not just what it looks like and feels like. Design is how it works`, author: `Steve Jobs`},
    {quote: `Graphic design will save the world right after rock and roll does`, author: `David Carson`},
    {quote: `Make it simple, but significant`, author: `Don Draper`},
    {quote: `Simplicity is the ultimate sophistication`, author: `Leonardo da Vinci`},
    {quote: `Whitespace is like air: it is necessary for design to breathe`, author: `Wojciech Zieliński`},
    {quote: `People ignore designs that ignore people`, author: `Frank Chimero`},
    {quote: `Recognizing the need is the primary condition for design`, author: `Charles Eames`},
    {quote: `Styles come and go. Good design is a language, not a style`, author: `Massimo Vignelli`},
    {quote: `There are three responses to a piece of design – yes, no, and WOW! Wow is the one to aim for`, author: `Milton Glaser`},
    {quote: `Styles come and go. Good design is a language, not a style`, author: `Massimo Vignelli`},
    {quote: `Even large companies need small logos`, author: `Tanner Christensen`},
    {quote: `If you can't explain it simply, you don't understand it well enough`, author: `Albert Einstein`},
    {quote: `Think more, Design less`, author: `Ellen Lupton`},
    {quote: `Even large companies need small logos`, author: `Tanner Christensen`},
    {quote: `Websites promote you 24/7: No employee will do that`, author: `Paul Cookson`},
    {quote: `If you think good design is expensive, you should look at the cost of bad design`, author: `Ralf Speth`},
    {quote: `Everything is designed. Few things are designed well`, author: `Brian Reed`},
  ];

  constructor(private tokenService: TokenService, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);

    this.quoteObj = this.quotes[randomIndex];
    setTimeout(() => {
      this.onLogout();
    }, 3000);
  }

  ngAfterViewInit(): void {
  }

  private onLogout(): void {
    const url = `${environment.url}/logout`;
    const getToken = this.tokenService.getToken();
    if (getToken) {
      this.http.post(url, '').subscribe((res: any) => {
        this.tokenService.deleteToken();
        if (res.success) {
          this.router.navigate(['/home']);
        }
      });

      return;
    }

    this.router.navigate(['/home']);
  }

}
