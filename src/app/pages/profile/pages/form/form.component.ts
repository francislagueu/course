import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {StepperService} from "@app/pages/profile/pages/form/components/stepper/services";
import {Observable, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {select, Store} from '@ngrx/store';

import * as fromRoot from '@app/store';
import * as fromDictionaries from '@app/store/dictionaries';
import {PersonalForm} from "@app/pages/profile/pages/form/components/personal/personal.component";
import {ProfessionalForm} from "@app/pages/profile/pages/form/components/professional/professional.component";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {

  dictionaries$: Observable<fromDictionaries.Dictionaries>;
  dictionariesIsReady$: Observable<boolean>;

  private destroy = new Subject<any>();
  constructor(
    private store: Store<fromRoot.State>,
    public stepper: StepperService) { }

  ngOnInit(): void {
    this.dictionaries$ = this.store.pipe(select(fromDictionaries.getDictionaries));
    this.dictionariesIsReady$ = this.store.pipe(select(fromDictionaries.getIsReady));

    this.stepper.init([
       {key: 'professional', label: 'Professional'},
       {key: 'personal', label: 'Personal'},
    ]);

    this.stepper.complete$.pipe(takeUntil(this.destroy)).subscribe(()=>{
      console.log('completed');
    });

    this.stepper.cancel$.pipe(takeUntil(this.destroy)).subscribe(()=>{
      console.log('canceled');
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onChangedPersonal(data: PersonalForm): void {
    console.log('personal changed = ', data);
  }

  onChangedProfessional(data: ProfessionalForm): void {

  }

}
