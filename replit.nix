{ pkgs }: {
  deps = [
    pkgs.nodejs
    pkgs.nodePackages.typescript
    pkgs.nodePackages.yarn
    pkgs.nodePackages.pnpm

    pkgs.ffmpeg
    pkgs.imagemagick
    pkgs.libwebp
    pkgs.libuuid
    pkgs.zlib
    pkgs.glibc
    pkgs.pkg-config

    pkgs.git
    pkgs.wget
    pkgs.speedtest-cli
    pkgs.neofetch

    pkgs.tesseract  # optional
    pkgs.python3    # optional
  ];

  env = {
    LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      pkgs.libuuid
    ];
  };
}
