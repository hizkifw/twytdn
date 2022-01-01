NAME = hizkifw/twytdn
TARGETS = x86_64-unknown-linux-gnu x86_64-apple-darwin x86_64-pc-windows-msvc

.PHONY: clean all $(TARGETS)

all: $(TARGETS)

$(TARGETS):
	mkdir -p build
	deno compile \
		--target $@ \
		--allow-net --allow-read --allow-write --allow-env \
		--output build/twytdn-$@ \
		src/index.ts

clean:
	rm -rf build
