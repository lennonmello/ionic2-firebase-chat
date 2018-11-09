import { CapitalizePipe } from './capitalize/capitalize.pipe';
import { NgModule } from '@angular/core';

@NgModule({
	declarations: [CapitalizePipe],
	imports: [],
	exports: [CapitalizePipe]
})
export class PipesModule {}
