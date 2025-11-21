interface CivilCaseDto {
    id:number;
    _102CaseId?: number;
    type?: string;
    _102CourtSummonsTo?: string;
    _102CourtSummonsMethod?: string;
    _102BlackCaseNo?: string;
    _102RedCaseNo?: string;
    _102CaseDate?: Date;
    _102CourtLevel?: string;
    _102CourtName?: string;
    _102CaseType?: string;
    _102ControversyAmt?: number;
    _102ChargeDesc?:string
    _102Plaintiff?: string;
    _102Defendant?: string;
};


export type {
    CivilCaseDto,
  }
  