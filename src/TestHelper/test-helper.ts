import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export class TestHelper{
    public static checkPresence(fixture: ComponentFixture<any>, id: string, isPresent = true){
        const element = fixture.debugElement.query(By.css(id)).nativeElement;
        if(isPresent){
            expect(element).toBeTruthy();
        }
        else{
            expect(element).toBeFalsy();
        }
    }

    public static checkPresenceAndClick(fixture: ComponentFixture<any>, id: string, detectChanges = true){
        const element = fixture.debugElement.query(By.css(id)).nativeElement;
        element.click();
        if(detectChanges){
            fixture.detectChanges();
        }
    }
}