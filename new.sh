#!/bin/sh
exec hugo new "post/$(date "+%Y-%m-%d")-$1.md"