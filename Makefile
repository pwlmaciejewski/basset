COFFEE := $(shell find lib/ test/ -name '*.coffee')
JS := $(patsubst %.coffee,%.js,$(COFFEE))


all: coffee

.PHONY: clean
clean:
	rm -f $(JS)

.PHONY: watch
watch:
	while true; do inotifywait $(COFFEE) -e modify; make coffee; done;

.PHONY: coffee
coffee: $(JS)

%.js: %.coffee
	coffee -c $<

