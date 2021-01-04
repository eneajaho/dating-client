import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { IQueryParams, MembersFilter, Pagination, User } from "@core/models";
import { API_URL } from "@core/tokens";
import { HttpErrorResponse } from "@angular/common/http";
import { MemberService } from "@core/services";

describe('MemberService', () => {
  let memberService: MemberService;
  let httpMock: HttpTestingController;
  let apiUrl: string = '/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: API_URL, useValue: apiUrl },
        MemberService
      ]
    });

    memberService = TestBed.inject(MemberService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(memberService).toBeTruthy();
  });

  describe('createParamsFromFilter method', () => {
    it('should return only valid http params', () => {
      let filters: Partial<IQueryParams & MembersFilter> = {
        gender: '',
        lastActive: undefined,
        pageNumber: '',
        minAge: '22',
        maxAge: undefined,
        pageSize: '2'
      };
      let params = memberService.createParamsFromFilter(filters);
      expect(params.toString()).toBe('MinAge=22&PageSize=2');
    });
  })

  describe('getMembers method', () => {
    let filters: Partial<IQueryParams & MembersFilter> = {
      gender: '',
      lastActive: '',
      maxAge: '99',
      minAge: '18',
      pageNumber: undefined,
      pageSize: '2'
    };
    let pagination: Pagination = {
      currentPage: 1,
      itemsPerPage: 2,
      totalItems: 10,
      totalPages: 5
    }
    let membersList: User[] = [
      { id: 1, username: 'test1', photos: [] },
      { id: 2, username: 'test2', photos: [] }
    ]
    const path = `${ apiUrl }/users`;

    it('should return a paginated result of users', () => {
      memberService.getMembers(filters).subscribe(res => {
        expect(res).toEqual({ pagination, result: membersList });
        expect(res.pagination).toBe(pagination);
        expect(res.result).toBe(membersList);
      });

      memberService.getMembers(filters).subscribe(res => {
        expect(res).toEqual({});
        expect(res.pagination).toEqual(pagination);
      });

      let params = memberService.createParamsFromFilter(filters);

      let pathWithParams = path + '?' + params.toString();

      const requests = httpMock.match(pathWithParams);
      expect(requests[0].request.urlWithParams).toBe(pathWithParams);
      expect(requests[0]?.request?.method).toEqual('GET');

      let headers = { 'Pagination': JSON.stringify(pagination) }

      requests[0].flush(membersList, { headers });
      requests[1].flush({}, { headers });
    });

    it('should return an error message', () => {
      let errorMessage = 'Error!!!';

      memberService.getMembers({}).subscribe(
        () => {
        },
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
          expect(error.statusText).toEqual('Not Found');
          expect(error.error).toEqual(errorMessage);
        }
      );

      const req = httpMock.expectOne(path);

      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });

  })

  describe('getMemberDetails method', () => {
    let testUser: User = { id: 1, username: 'test', photos: [] };
    const path = `${ apiUrl }/users/${ 1 }`;

    it('should return a User or empty object', () => {
      memberService.getMemberDetails(1).subscribe(res => {
        expect(res).toEqual(testUser);
      });

      memberService.getMemberDetails(1).subscribe(res => {
        expect(res).toEqual({});
        expect(res.id).toBe(undefined);
      });

      const requests = httpMock.match(path);

      expect(requests[0].request.method).toEqual('GET');

      requests[0].flush(testUser);
      requests[1].flush({});
    });

    it('should return an error message', () => {
      let errorMessage = 'Error!!!';

      memberService.getMemberDetails(1).subscribe(
        () => {
        },
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
          expect(error.statusText).toEqual('Not Found');
          expect(error.error).toEqual(errorMessage);
        }
      );

      const req = httpMock.expectOne(path);

      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });

  })

  describe('editMember method', () => {
    let testUser: User = { id: 1, username: 'test', photos: [] };
    const path = `${ apiUrl }/users/${ testUser.id }`;

    it('should return a User', () => {
      memberService.editMember(testUser).subscribe(res => {
        expect(res).toEqual(testUser);
        expect(res.id).toEqual(testUser.id);
      });

      const req = httpMock.expectOne(path);
      expect(req.request.method).toEqual('PUT');
      req.flush(testUser);
    });

    it('should return an error message', () => {
      let errorMessage = 'Error!!!';
      let testUser: User = { id: 1, username: 'test', photos: [] };
      memberService.editMember(testUser).subscribe(
        () => {},
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
          expect(error.statusText).toEqual('Not Found');
          expect(error.error).toEqual(errorMessage);
        }
      );
      const req = httpMock.expectOne(path);
      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });

  })

});
