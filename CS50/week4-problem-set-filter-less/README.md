# Week 4 Problem Set Filter-Less


## Compile

```sh
make filter --always-make
```

## Usage

**g**rayscale

```sh
 ./filter -g ./images/tower.bmp ./outputs/tower.bmp
```

**s**epia

```sh
 ./filter -s ./images/tower.bmp ./outputs/tower.bmp
```

**r**eflect

```sh
 ./filter -r ./images/tower.bmp ./outputs/tower.bmp
```

**b**lur

```sh
 ./filter -b ./images/tower.bmp ./outputs/tower.bmp
```

## Check

```sh
check50 --local cs50/problems/2022/x/filter/less
```