import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';


/**
 * Get information of user from token
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private jwtHelper: JwtHelperService) {
  }

  /**
   * Decoded jwt token with information from user
   */
  private getDecodedToken(): JWTToken | null {
    return this.jwtHelper.decodeToken(localStorage.getItem('token'));
  }

  /**
   * Return the used token
   */
  getPlainToken(): string {
    return localStorage.getItem('token');
  }

  /**
   * Get username from an
   * user that is logged in.
   */
  getUsername(): string | null {
    return this.getDecodedToken().username;
  }

  /**
   * Returns user role [1,2,4,8,16] = [Admin,Moderator,Docent,Tutor,Student]
   */
  getUserRole(): number {
    return this.getDecodedToken().role_id;
  }

  /**
   * Prename of user
   */
  getPrename(): string {
    return this.getDecodedToken().prename;
  }

  /**
   * Surname of user
   */
  getSurname(): string {
    return this.getDecodedToken().surname;
  }

  /**
   * Email of user
   */
  getEmail(): string {
    return this.getDecodedToken().email;
  }
  /**
   * Guest state of user
   */
  isGuest(): boolean {
    return this.getDecodedToken().guest;
  }

  getUserId(): number {
    return this.getDecodedToken().user_id;
  }

  isDocentInCourse(courseid: number): boolean {
    return this.getDecodedToken().docent_in_course.split(',').indexOf(courseid.toString(10)) >= 0;
  }

  isTutorInCourse(courseid: number): boolean {
    return this.getDecodedToken().tutor_in_course.split(',').indexOf(courseid.toString(10)) >= 0;
  }
}


/**
 * Used to parse JWT token
 */
export interface JWTToken {
  readonly sub: string;
  readonly user_id: number;
  readonly username: string;
  readonly prename: string;
  readonly surname: string;
  readonly role_id: number;
  readonly email: string;
  readonly token_type: string;
  readonly iat: number;
  readonly exp: number;
  readonly guest: boolean;
  readonly docent_in_course: string;
  readonly tutor_in_course: string;
}
