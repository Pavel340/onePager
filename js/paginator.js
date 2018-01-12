'use strict';

class Paginator {
	constructor() {
		this.scrollEvents();
		this.clickEvents();
		this.activeSlide = 1;
		this.canGo = 1;
		this.max = 4;
		this.delay = 1000;
	}

	scrollEvents() {
		var self = this;
		$(window).on('wheel', function(e) {
			if(!self.canGo) return;
			
			e = e.originalEvent;
			var direction = e.deltaY > 0 ? 1 : -1;

			var newSlide = self.activeSlide + direction;
			if(newSlide > self.max || newSlide < 1) return;
			self.canGo = false;

			PubSub.publish('goToSlide', {from: self.activeSlide, to: newSlide});
			self.activeSlide = newSlide;
			setTimeout(function() {
				self.canGo =true;
			}, self.delay);
		});
	}

	clickEvents() {
		var self = this;
		$('.pagination a').on('click', function(e) {
			e.preventDefault();
			if(!self.canGo) return;
			self.canGo = false;
			var newSlide = $(this).data('gotoslide');
			if(newSlide !== self.activeSlide) {
				PubSub.publish('goToSlide', {from: self.activeSlide, to: newSlide});
				self.activeSlide = newSlide;
				setTimeout(function() {
					self.canGo = true;
				}, self.delay);
			}
		});
	}
}