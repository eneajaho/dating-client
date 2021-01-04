import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { PhotoService } from "@core/services/photo.service";
import { Photo } from "@core/models";
import { API_URL } from "@core/tokens";
import { HttpErrorResponse } from "@angular/common/http";

describe('PhotoService', () => {
  let photoService: PhotoService;
  let httpMock: HttpTestingController;
  let apiUrl: string = '/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: API_URL, useValue: apiUrl },
        PhotoService
      ]
    });

    // Inject the service that we want to test
    photoService = TestBed.inject(PhotoService);
    // Inject the HttpTestingController in order to mock api responses
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(photoService).toBeTruthy();
  });

  describe('#uploadPhoto', () => {
    let testPhoto: Photo = {
      id: 1,
      url: 'http://test.com',
      description: 'test',
      addedAt: new Date(),
      isMain: true
    };
    let userId = 1
    let path = `${ apiUrl }/users/${ userId }/photos`;

    it('should return a photo, empty object or null', () => {
      photoService.uploadPhoto(testPhoto, userId).subscribe(res => {
        expect(res).toEqual(testPhoto);
      });

      photoService.uploadPhoto({}, userId).subscribe(res => {
        expect(res).toEqual({});
        expect(res.description).toBe(undefined);
      });

      photoService.uploadPhoto(null, userId).subscribe(res => {
        expect(res).toEqual(null);
      });

      // get all pending requests that match the given URL
      const requests = httpMock.match(path);

      // Assert that the first request is a POST.
      expect(requests[0].request.method).toEqual('POST');

      // Respond with mock data, causing Observable to resolve.
      // Subscribe callback asserts that correct data was returned.
      requests[0].flush(testPhoto);
      requests[1].flush({});
      requests[2].flush(null);
    });

    it('should return an error message', () => {
      let errorMessage = 'Error!!!';

      photoService.uploadPhoto({}, userId).subscribe(
        res => {
          expect(res).toEqual({});
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

  describe('#setMainPhoto', () => {
    let userId = 1
    let photoId = 1;

    let path = `${ apiUrl }/users/${ userId }/photos/${ photoId }/setMain`;

    it('should return empty object', () => {
      photoService.setMainPhoto(userId, photoId).subscribe(res => {
        expect(res).toEqual({});
      });

      // The following `expectOne()` will match the request's URL.
      // If no requests or multiple requests matched that URL `expectOne()` would throw.
      const req = httpMock.expectOne(path);

      expect(req.request.method).toEqual('POST');

      req.flush({});
    });

  })

  describe('#deletePhoto', () => {
    let path = `${ apiUrl }/users/${ 1 }/photos/${ 1 }`;

    it('should return empty object (void)', () => {
      photoService.deletePhoto(1, 1).subscribe(res =>
        expect(res).toEqual({})
      );
      const req = httpMock.expectOne(path);
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });
  })

});
