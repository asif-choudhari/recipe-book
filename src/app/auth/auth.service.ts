import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js'
import { environment } from '../shared/configs/supabse.config';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private supabaseClient: SupabaseClient;
  public userChanges: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async getSession() {
    return this.supabaseClient.auth.getSession();
  }

  async getSessionUser() {
    return await this.supabaseClient.auth.getUser();
  }

  async signUp(email: string, password: string) {
    return await this.supabaseClient.auth.signUp({ email, password });
  }

  async signIn(email: string, password: string) {
    this.userChanges.next(true);
    return await this.supabaseClient.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    this.userChanges.next(false);
    await this.supabaseClient.auth.signOut().catch(console.error)
  }

}
