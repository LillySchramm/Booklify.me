import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UiService } from '../../services/ui.service';

@Component({
    selector: 'app-no-image-placeholder',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './no-image-placeholder.component.html',
    styleUrls: ['./no-image-placeholder.component.scss'],
})
export class NoImagePlaceholderComponent {
    constructor(public ui: UiService) {}
}
